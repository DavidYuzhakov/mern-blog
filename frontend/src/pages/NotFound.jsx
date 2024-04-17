import Alert from '@mui/material/Alert';

export default function NotFound () {
  return (
    <>
      <h2 style={{ textAlign: 'center' }}>Oops, 404 Error!</h2>
      <Alert severity="warning">The page is not found. Please try again later :(</Alert>
    </>
  )
}