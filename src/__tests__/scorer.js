/* eslint-env jest */

import {default as scorer, tagCountsToScore} from '../scorer'

it('canary', () => {
  expect(1).toEqual(1)
})

describe('tagCountsToScore', () => {
  const tester = (testName, tagCounts, expected) => {
    it(testName, () => {
      expect(tagCountsToScore(tagCounts)).toEqual(expected)
    })
  }

  tester('basic', {}, 0)
  tester('1 div', {div: 1}, 3) // 1x3 = 3 points
  tester('1 font', {div: 1}, 3) // 1x-1 = -1 points
  tester('1 div, 2 p', {div: 1, p: 2}, 5) // 1x3 + 2x1 = 5 points
  tester('1 div, 2 p', {div: 1, p: 2}, 5) // 1x3 + 2x1 = 5 points

  // edge cases
  tester('1 Div (case insensitive) ', {Div: 1}, 3) // 1x3 = 3 points
  tester('1 strong (not scored) ', {strong: 1}, 0) // 1x0 = 0 points
})

describe('scorer', () => {
  const tester = (testName, tagCounts, expected) => {
    it(testName, () => {
      expect(scorer(tagCounts)).toEqual(expected)
    })
  }

  tester('basic', '', 0)
  tester('<html>', '<html></html>', 5)
  tester('example given in README', `
    <html>
        <body>
          <p>foo</p>
          <p>bar</p>
          <div text-align='center'>
            <big>hello world</big>
          </div>
        </body>
    </html>`, 13)
})
