function Radio({ children, ...props }) {
  return (
    <label className='flex items-center'>
      <input
        type='radio'
        className='h-3.5 w-3.5 text-blue-500'
        {...props}
      />
      <span className='ml-2'>{children}</span>
    </label>
  );
}

export default Radio;
