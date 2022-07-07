import React from 'react';
import {setSortType} from '../redux/slices/filter';
import {useSelector, useDispatch} from 'react-redux';

export const sortList = [ 
    {name: 'популярности', sortProperty: 'popular'},
    {name: 'цене', sortProperty: 'price'}, 
    {name: 'алфавиту', sortProperty: 'title'},
];
export default function SortPopup() {

    const dispatch = useDispatch();
    const {sortType} = useSelector((state) => state.filter);
    const onChangeSort = (i) => {
      dispatch(setSortType(i));
    };
    
    const [ visiblePopup, setVisiblePopup ] = React.useState(false);
    
   

    const onSelectItem = (index) => {
        onChangeSort(index);
        setVisiblePopup(false)
    }
    
    const sortRef = React.useRef();
    
    

    React.useEffect(() => {
        const handleOutsideClick = (e) => {

            if(!e.path.includes(sortRef.current)) {
                setVisiblePopup(false);
            }
        }

        document.body.addEventListener('click', handleOutsideClick);

        return () => document.body.removeEventListener('click', handleOutsideClick);


    }, [])




  return (
    <div ref={sortRef} className="sort">
        <div className="sort__label">
            <svg
                className={visiblePopup ? 'rotated' : ''}
                width="10"
                height="6"
                viewBox="0 0 10 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                >
                <path
                d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                fill="#2C2C2C"
                />
            </svg>
            <b>Сортировка по:</b>
            <span onClick={() => setVisiblePopup(!visiblePopup)}>{sortType.name}</span>
        </div>

        { visiblePopup && 
        (<div className="sort__popup">
            <ul>
                {sortList && sortList.map((obj, i) => (
                    <li 
                        className={sortType.name === obj.name ? 'active' : ''}
                        onClick={ () => onSelectItem(obj)}
                        key={obj.name}>
                        
                        {obj.name}
                    </li>
                    )
                )}
               
              
            </ul>
        </div>) }
    </div>
  )
}
