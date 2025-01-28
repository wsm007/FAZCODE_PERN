import { forwardRef } from 'react'

// eslint-disable-next-line react/display-name
export const Textarea = forwardRef((props, ref) => {
    return (
        <textarea
            className="bg-zinc-800 px-3 py-2 block my-2 w-full"
            ref={ref}
            {...props}
        >
          {props.children}
        </textarea>
    );
})

export default Textarea