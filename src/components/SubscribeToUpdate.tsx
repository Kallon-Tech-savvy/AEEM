import { useState } from 'react';
import '../assets/styles/subscribeToUpdate.css';
import { Button } from './Button';

export default function SubscribeToUpdate() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim()) {
      setStatus('Please enter a valid email address.');
      return;
    }
    setStatus('Thank you! We will share AEEM updates with you soon.');
    setEmail('');
  };

  return (
    <form onSubmit={handleSubmit} className='subscribe-form'>
      <label htmlFor='subscribe'>Subscribe for updates</label>
      <input
        type='email'
        id='subscribe'
        placeholder='info@aeem.ex'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        aria-describedby='subscribe-status'
      />
      <Button type='submit' variant='primary'>Subscribe</Button>
      {status && <p id='subscribe-status' className='subscribe-status'>{status}</p>}
    </form>
  );
}
