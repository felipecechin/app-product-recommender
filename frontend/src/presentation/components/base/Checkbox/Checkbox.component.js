export function Checkbox({ children, ...props }) {
  return (
    <label className='flex items-center'>
      <input
        type='checkbox'
        className='h-5 w-5 text-blue-500'
        {...props}
      />
      <span className='ml-2'>{children}</span>
    </label>
  );
}
