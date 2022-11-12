from flask import Flask, render_template


app = Flask(__name__)


@app.route('/scan')
def index_():
    return render_template('index.html')


@app.route('/enter_amount')
def enter_amount_():
    return render_template('enter_amount.html')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')