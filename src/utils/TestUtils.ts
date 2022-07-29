export class MockStorage implements Storage {
  private record: Record<string, string> = {}

  public get length(): number {
    return Object.keys(this.record).length
  }

  clear = () => {
    this.record = {}
  }

  getItem = (key: string): string | null => this.record[key] ?? null
  key = (index: number): string | null => Object.keys(this.record).at(index) ?? null

  removeItem = (key: string) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { [key]: _, ...rest } = this.record
    this.record = rest
  }

  setItem = (key: string, value: string) => {
    this.record[key] = value
  }
}
