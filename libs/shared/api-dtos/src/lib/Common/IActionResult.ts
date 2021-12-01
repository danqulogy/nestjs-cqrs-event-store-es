export interface IActionResult {
  status: '404' | '500' | '500' | 'error' | 'success' | 'info' | 'warning'
  title: string
  subtitle1: string
  subtitle2: string
}
