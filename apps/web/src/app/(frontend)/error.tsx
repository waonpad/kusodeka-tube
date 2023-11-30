'use client';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="m-4 font-bold">
      <p>{error.message}</p>
      <p>{JSON.stringify(error, null, 2)}</p>
      <button className="rounded-lg bg-blue-500 px-2 py-1 text-white" onClick={() => reset()}>
        Try again
      </button>
    </div>
  );
}
