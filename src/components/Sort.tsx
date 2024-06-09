import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { SortPropertyEnum, SortType } from "../redux/filter/types";
import { setSort } from "../redux/filter/slice";

type ListType = {
  name: string;
  sortProperty: SortPropertyEnum;
};

type SortPopupPropsType = {
  value: SortType;
};

// type PopupClickType = React.MouseEvent<HTMLBodyElement> & {
//   path: Node[];
// };

export const list: ListType[] = [
  { name: "популярности (DESC)", sortProperty: SortPropertyEnum.RATING_DESC },
  { name: "популярности (ASC)", sortProperty: SortPropertyEnum.RATING_ASC },
  { name: "цене (DESC)", sortProperty: SortPropertyEnum.PRICE_DESC },
  { name: "цене (ASC)", sortProperty: SortPropertyEnum.PRICE_ASC },
  { name: "алфавиту (DESC)", sortProperty: SortPropertyEnum.TITLE_DESC },
  { name: "алфавиту (ASC)", sortProperty: SortPropertyEnum.TITLE_ASC },
];

const Sort: React.FC<SortPopupPropsType> = React.memo(({ value }) => {
  const list: ListType[] = [
    { name: "популярности (DESC)", sortProperty: SortPropertyEnum.RATING_DESC },
    { name: "популярности (ASC)", sortProperty: SortPropertyEnum.RATING_ASC },
    { name: "цене (DESC)", sortProperty: SortPropertyEnum.PRICE_DESC },
    { name: "цене (ASC)", sortProperty: SortPropertyEnum.PRICE_ASC },
    { name: "алфавиту (DESC)", sortProperty: SortPropertyEnum.TITLE_DESC },
    { name: "алфавиту (ASC)", sortProperty: SortPropertyEnum.TITLE_ASC },
  ];

  const sortRef = React.useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const onClickListItem = (obj: any) => {
    dispatch(setSort(obj));
    setOpen(false);
  };

  React.useEffect(() => {
    const handelClickOutside = (event: any) => {
      // if (!event.path.includes(sortRef.current)) {
      //   setOpen(false);
      //   // console.log("sh");
      // }
      // sortRef.current
    };
    document.body.addEventListener("click", handelClickOutside);

    return () => {
      document.body.removeEventListener("click", handelClickOutside);
    };
  }, []);

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <svg
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
        <span onClick={() => setOpen(!open)}>{value.name}</span>
      </div>
      {open && (
        <div className="sort__popup">
          <ul>
            {list.map((obj, i) => (
              <li
                // className={
                //   value.sortProperty === sort.sortProperty ? "active" : ""
                // }
                onClick={() => onClickListItem(obj)}
              >
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
});

export default Sort;