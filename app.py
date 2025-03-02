from flask import Flask, request, jsonify, render_template, redirect, url_for, session
from flask_sqlalchemy import SQLAlchemy
import requests
import hashlib

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///products.db'
app.config['SECRET_KEY'] = 'your_secret_key'
db = SQLAlchemy(app)

class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    category = db.Column(db.String(100), nullable=False)
    price = db.Column(db.Float, nullable=False)
    rating = db.Column(db.String(10), nullable=False)
    image = db.Column(db.String(200), nullable=False)

    def as_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'category': self.category,
            'price': self.price,
            'rating': self.rating,
            'image': self.image
        }

@app.route('/')
def home():
    category = request.args.get('category')
    brand = request.args.get('brand')
    price_range = request.args.get('price_range')
    query = request.args.get('q')

    query_obj = Product.query
    if category:
        query_obj = query_obj.filter_by(category=category)
    if brand:
        query_obj = query_obj.filter(Product.name.contains(brand))
    if price_range:
        if '-' in price_range:
            min_price, max_price = map(float, price_range.split('-'))
            query_obj = query_obj.filter(Product.price.between(min_price, max_price))
        else:
            min_price = float(price_range[:-1])
            query_obj = query_obj.filter(Product.price >= min_price)
    if query:
        query_obj = query_obj.filter(Product.name.contains(query) | Product.category.contains(query))

    products = query_obj.all()
    return render_template('site.html', products=products)

@app.route('/category/<category_name>')
def category(category_name):
    products = Product.query.filter_by(category=category_name).all()
    return render_template('category.html', products=products, category_name=category_name)

@app.route('/cart')
def cart():
    cart_items = session.get('cart', [])
    total_price = sum(item['price'] for item in cart_items)
    return render_template('cart.html', cart_items=cart_items, total_price=total_price)

@app.route('/add_to_cart/<int:product_id>')
def add_to_cart(product_id):
    product = Product.query.get_or_404(product_id)
    cart = session.get('cart', [])
    cart.append(product.as_dict())
    session['cart'] = cart
    return redirect(url_for('cart'))

@app.route('/remove_from_cart/<int:product_id>')
def remove_from_cart(product_id):
    cart = session.get('cart', [])
    cart = [item for item in cart if item['id'] != product_id]
    session['cart'] = cart
    return redirect(url_for('cart'))

@app.route('/checkout', methods=['POST'])
def checkout():
    cart_items = session.get('cart', [])
    total_price = sum(item['price'] for item in cart_items)
    
    merchant_id = 'your_merchant_id'
    merchant_key = 'your_merchant_key'
    merchant_salt = 'your_merchant_salt'
    email = 'customer@example.com'
    payment_amount = int(total_price * 100)  # Kuruş cinsinden
    user_ip = request.remote_addr
    merchant_oid = hashlib.sha256(str(total_price).encode()).hexdigest()
    user_name = 'Customer Name'
    user_address = 'Customer Address'
    user_phone = 'Customer Phone'
    merchant_ok_url = url_for('payment_success', _external=True)
    merchant_fail_url = url_for('payment_fail', _external=True)
    user_basket = [[item['name'], str(item['price']), '1'] for item in cart_items]

    hash_str = f"{merchant_id}{user_ip}{merchant_oid}{email}{payment_amount}{merchant_salt}"
    paytr_token = hashlib.sha256(hash_str.encode()).hexdigest()

    payload = {
        'merchant_id': merchant_id,
        'user_ip': user_ip,
        'merchant_oid': merchant_oid,
        'email': email,
        'payment_amount': payment_amount,
        'paytr_token': paytr_token,
        'user_basket': str(user_basket),
        'debug_on': 1,
        'no_installment': 0,
        'max_installment': 0,
        'user_name': user_name,
        'user_address': user_address,
        'user_phone': user_phone,
        'merchant_ok_url': merchant_ok_url,
        'merchant_fail_url': merchant_fail_url
    }

    response = requests.post('https://www.paytr.com/odeme/api/get-token', data=payload)
    response_data = response.json()

    if response_data['status'] == 'success':
        token = response_data['token']
        return render_template('payment.html', token=token)
    else:
        return redirect(url_for('payment_fail'))

@app.route('/payment_success')
def payment_success():
    session.pop('cart', None)
    return render_template('payment_success.html')

@app.route('/payment_fail')
def payment_fail():
    return render_template('payment_fail.html')

@app.route('/admin')
def admin():
    products = Product.query.all()
    return render_template('admin.html', products=products)

@app.route('/admin/add', methods=['POST'])
def admin_add_product():
    product = Product(
        name=request.form['name'],
        category=request.form['category'],
        price=request.form['price'],
        rating=request.form['rating'],
        image=request.form['image']
    )
    db.session.add(product)
    db.session.commit()
    return redirect(url_for('home'))

@app.route('/admin/update/<int:product_id>', methods=['POST'])
def admin_update_product(product_id):
    product = Product.query.get_or_404(product_id)
    product.name = request.form['name']
    product.category = request.form['category']
    product.price = request.form['price']
    product.rating = request.form['rating']
    product.image = request.form['image']
    db.session.commit()
    return redirect(url_for('home'))

@app.route('/admin/delete/<int:product_id>', methods=['POST'])
def admin_delete_product(product_id):
    product = Product.query.get_or_404(product_id)
    db.session.delete(product)
    db.session.commit()
    return redirect(url_for('home'))

@app.route('/api/products', methods=['GET'])
def get_products():
    products = Product.query.all()
    return jsonify([product.as_dict() for product in products])

@app.route('/api/products', methods=['POST'])
def add_product():
    product = Product(
        name=request.json['name'],
        category=request.json['category'],
        price=request.json['price'],
        rating=request.json['rating'],
        image=request.json['image']
    )
    db.session.add(product)
    db.session.commit()
    return jsonify(product.as_dict()), 201

@app.route('/api/products/<int:product_id>', methods=['PUT'])
def update_product(product_id):
    product = Product.query.get_or_404(product_id)
    product.name = request.json['name']
    product.category = request.json['category']
    product.price = request.json['price']
    product.rating = request.json['rating']
    product.image = request.json['image']
    db.session.commit()
    return jsonify(product.as_dict())

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
