export function Button({ children, type }: { children: string; type: 'submit' | 'reset' | 'button' }) {
  return (
    <button type={type}>
      {children}
      <span>_</span>
      <span>click</span>
    </button>
  );
}
