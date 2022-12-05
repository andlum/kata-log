import { mission } from '../src/index';

describe("Functional tests for Mars Rover Kata implementation", () => {
  test("test A", () => {
    const input = [
      "4 8",
      "(2, 3, E) LFRFF",
      "(0, 2, N) FFLFRFF"
    ]

    const output = [
      "(4, 4, E)",
      "(0, 4, W) LOST"
    ]

    expect(mission(input)).toEqual(output)
  })


  test("test B", () => {
    const input = [
      "4 8",
      "(2, 3, N) FLLFR",
      "(1, 0, S) FFRLF"
    ]

    const output = [
      "(2, 3, W)",
      "(1, 0, S) LOST"
    ]

    expect(mission(input)).toEqual(output)
  })
})
