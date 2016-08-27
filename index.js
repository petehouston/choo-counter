var $ = require('jquery');
window.$ = window.jQuery = $;

const choo = require('choo')
const html = require('choo/html')
const xtend = require('xtend')
const app = choo()

const home = (state, prev, send) => {

    return html`
        <div class="container" style="margin-top: 100px">
            <div class="row">
                <div class="col-md-8 col-md-offset-2">
                    <h1>Example of choo app</h1>
                    <div class="panel panel-primary">
                        <div class="panel-heading">
                            <h1 class="panel-title">choo-counter</h1>
                        </div>

                        <div class="panel-body">
                            <div class="row">
                                <div class="col-md-8">
                                    <input type="number" class="form-control" value="${state.number}" onchange=${onChange} />
                                </div>
                                <div class="col-md-2">
                                    <a href="#" onclick=${onIncrease} class="btn btn-block btn-success">+</a>
                                </div>
                                <div class="col-md-2">
                                    <a href="#" onclick=${onDecrease} class="btn btn-block btn-success">-</a>
                                </div>
                            </div>
                            <p style="margin-top: 20px">Current counter value is: <strong>${state.number}</strong></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
    function onChange(e) {
        send('setValue', { value: parseInt(e.target.value) })
    }

    function onIncrease(e) {
        send('increase', { value: 1 })
    }

    function onDecrease(e) {
        send('decrease', { value: 1 })
    }
}

app.model({
    state: {
        number: 0
    },
    reducers: {
        setValue: (data, state) => {
            return { number: data.value }
        },
        increase: (data, state) => {
            return { number: state.number + data.value }
        },
        decrease: (data, state) => {
            return { number: state.number - data.value }
        }
    }
})

app.router((route) => [
    route('/', home)
])

const renderedDom = app.start()
document.body.appendChild(renderedDom)

