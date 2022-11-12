from flask import Flask, render_template, send_from_directory


app = Flask(__name__)


@app.route('/scan')
def index_():
    return render_template('index.html')


@app.route('/enter_amount')
def enter_amount_():
    return render_template('enter_amount.html')

@app.route('/sw.js')
def __sw():
    return send_from_directory('.', 'sw.js')

@app.route('/manifest.json')
def __manifest():
    return send_from_directory('.', 'manifest.json')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')