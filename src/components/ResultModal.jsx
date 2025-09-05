import {forwardRef, useImperativeHandle, useRef} from 'react';
import {createPortal} from "react-dom"

// New way without forwardRef
/*export default function ResultModal({result, targetTime, ref }) 
{
    
    return (
        <dialog ref={ref} className="result-modal">
            <h2>You {result}</h2>
            <p>Your time was <strong>{targetTime} second{targetTime>1 ?"s":""}</strong></p>
            <p>You stopped the timer with <strong>X seconds left</strong></p>
            <form method="dialog">
                <button>Close</button>
            </form>
        </dialog>
    );
} */

// Old react way to forward refs
const ResultModal=forwardRef(function ResultModal({remainingTime, targetTime , onReset }, ref) 
{
    const userWon=remainingTime>0;
    const remaingTimeFormated=remainingTime?(remainingTime / 1000).toFixed(2):0;
    const score= Math.round((1 - remainingTime / (targetTime * 1000)) * 100)


    const dialog=useRef(null);
    useImperativeHandle(ref, () => ({
        open: () => {
            dialog.current.showModal();
            }
        })
    );

    return (
        createPortal(
        <dialog ref={dialog} className="result-modal" onClose={onReset}>
            {userWon && <h2>You Score : {score}</h2>}
            {!userWon && <h2>You Lost</h2>}
            <p>Your time was <strong>{targetTime} second{targetTime>1 ?"s":""}</strong></p>
            <p>You stopped the timer with <strong>{remaingTimeFormated} seconds left</strong></p>
            <form method="dialog" onSubmit={onReset}>
                <button>Close</button>
            </form>
        </dialog>, document.getElementById('modal'))
    );
});
export default ResultModal;

