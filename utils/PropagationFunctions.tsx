export const handlePropagationClick = (event: any, call: ()=> void) => {
    event.stopPropagation();
    call();
}