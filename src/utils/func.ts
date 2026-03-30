export const generateTrackingNumber = () => {
  const letters = 'abcdefghijklmnopqrstuvwxyz'
  const num = Math.floor(Math.random() * 100000)
  const letter = Array(3).fill('').map(()=>letters[Math.floor(Math.random()*letters.length)]).join('');
  return (letter + "-"+num.toString()).toUpperCase()
}