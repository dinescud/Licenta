export const config = {
    baseUrl: 'http://localhost:3000/api',

}

export const themes = {
  light: {
    '--text-color': '#111111',
    '--bg-color': '#ffffff',
    '--danger-color': '#e63946',
    '--safe-color': '#2a9d8f',
    '--danger-bg': '#ffeeef',
    '--safe-bg': '#e5ffed',
    '--button-text': '#ffffff',
    '--toggle-bg': '#f4f4f4',
    '--app-bg': '#f5f5f5',
    '--card-shadow': '0 4px 12px rgba(0, 0, 0, 0.1)',
  },
  dark: {
    '--text-color': '#f1f1f1',
    '--bg-color': '#333333',
    '--danger-color': '#ff5a67',
    '--safe-color': '#40c8b9',
    '--danger-bg': '#3d1a1d',
    '--safe-bg': '#1a3330',
    '--button-text': '#ffffff',
    '--toggle-bg': '#555555',
    '--app-bg': '#222222',
    '--card-shadow': '0 4px 12px rgba(0, 0, 0, 0.3)',
  }
}