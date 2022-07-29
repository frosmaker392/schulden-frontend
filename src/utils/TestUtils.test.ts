import { MockStorage } from './TestUtils'

describe('MockStorage', () => {
  test('works like a key-value store', () => {
    const storage = new MockStorage()

    // Starts empty
    expect(storage.length).toBe(0)
    expect(storage.getItem('k1')).toBeNull()

    // setItem works
    storage.setItem('k1', 'v1')
    expect(storage.getItem('k1')).toBe('v1')

    // setItem updates record, length also works
    storage.setItem('k1', 'V1')
    storage.setItem('k2', 'v2')
    storage.setItem('k3', 'v3')
    expect(storage.getItem('k1')).toBe('V1')
    expect(storage.length).toBe(3)

    // clear works
    storage.clear()
    expect(storage.length).toBe(0)

    // key works
    storage.setItem('k1', 'V1')
    storage.setItem('k2', 'v2')
    storage.setItem('k3', 'v3')
    expect(storage.key(1)).toBe('k2')

    // removeItem works
    storage.removeItem('k2')
    expect(storage.length).toBe(2)
    expect(storage.getItem('k2')).toBeNull()
  })
})
