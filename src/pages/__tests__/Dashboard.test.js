const render = require('preact-render-to-string')
const cheerio = require('cheerio')
const { html } = require('../../utils.js')

const Dashboard = require('../Dashboard.js')

describe('<Dashboard>', () => {
  const data = {
    name: 'Fred Smith',
    sin: '123-456-789',
    dobDay: '18',
    dobMonth: '06',
    dobYear: '1971',
    address: 'Mississauga',
  }

  const expectedStrings = [
    'Fred Smith',
    '123-456-789',
    '18-06-1971',
    'Mississauga',
  ]

  test('renders h1 as expected', () => {
    const $ = cheerio.load(
      render(
        html`
          <${Dashboard} data=${data} />
        `,
      ),
    )
    expect($('h1').length).toBe(1)
    expect($('h1').text()).toEqual('Dashboard')
  })

  expectedStrings.map(str => {
    test(`renders ${str} on page`, () => {
      const $ = cheerio.load(
        render(
          html`
            <${Dashboard} data=${data} />
          `,
        ),
      )
      expect($('h1').text()).toEqual('Dashboard')

      expect(
        $('h1')
          .next()
          .html(),
      ).toContain(str)
    })
  })
})
