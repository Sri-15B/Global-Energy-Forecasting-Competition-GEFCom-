export default function Login({ onLogin }) {
  return (
    <div className="h-screen flex items-center justify-center bg-blue-600">
      <div className="bg-white p-8 rounded shadow-md w-80 text-center">
        <h1 className="text-2xl font-bold mb-6">Energy Dashboard</h1>
        <button
          className="w-full bg-blue-500 text-white py-2 rounded"
          onClick={onLogin}
        >
          Enter Dashboard
        </button>
      </div>
    </div>
  );
}
