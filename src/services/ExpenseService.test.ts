import { Person } from '../graphql/generated'
import { calculateSplit } from './ExpenseService'

const testPersons: Person[] = [
  {
    id: 'test-id-1',
    name: 'user1',
  },
  {
    id: 'test-id-2',
    name: 'user2',
  },
  {
    id: 'test-id-3',
    name: 'person1',
  },
]

describe('calculateSplit', () => {
  describe('splits equally', () => {
    test('with equal amounts if amount is divisible', () => {
      const { debtors, rest } = calculateSplit(3.33, 'equal', testPersons, [])

      expect(debtors.map((d) => d.person)).toEqual(testPersons)
      expect(debtors.map((d) => d.amount)).toEqual([1.11, 1.11, 1.11])
      expect(rest).toBe(0)
    })

    test('with almost equal amounts, first n people have 1 cent extra', () => {
      const { debtors, rest } = calculateSplit(3.35, 'equal', testPersons, [])

      expect(debtors.map((d) => d.person)).toEqual(testPersons)
      expect(debtors.map((d) => d.amount)).toEqual([1.12, 1.12, 1.11])
      expect(rest).toBe(0)
    })
  })

  describe('splits unequally', () => {
    test('calculates rest correctly given amounts', () => {
      const { debtors, rest } = calculateSplit(3, 'unequal', testPersons, [1, 1.5, 0.3])

      expect(debtors.map((d) => d.person)).toEqual(testPersons)
      expect(debtors.map((d) => d.amount)).toEqual([1, 1.5, 0.3])
      expect(rest).toBe(0.2)
    })

    test('defaults amount to zero if amounts array is not long enough', () => {
      const { debtors, rest } = calculateSplit(3, 'unequal', testPersons, [1, 1.5])

      expect(debtors.map((d) => d.person)).toEqual(testPersons)
      expect(debtors.map((d) => d.amount)).toEqual([1, 1.5, 0])
      expect(rest).toBe(0.5)
    })
  })
})
