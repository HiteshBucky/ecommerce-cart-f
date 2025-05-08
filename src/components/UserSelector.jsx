import { useCart } from '../context/CartContext';

const USERS = [
  { id: 1, name: 'User 1' },
  { id: 2, name: 'User 2' },
  { id: 3, name: 'User 3' },
];

export default function UserSelector() {
  const { userId, setUserId } = useCart();

  return (
    <div>
      <label htmlFor='user-select' className='mr-2 font-medium'>
        Select User:
      </label>
      <select
        id='user-select'
        value={String(userId)}
        onChange={(e) => setUserId(parseInt(e.target.value, 10))}
        className='border border-gray-300 text-black rounded px-2 py-1 bg-white'
      >
        {USERS.map((user) => (
          <option key={user.id} value={String(user.id)}>
            {user.name}
          </option>
        ))}
      </select>
    </div>
  );
}
