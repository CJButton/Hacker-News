import { useFetchStory } from "./hooks";
import { ATTR_ITEM_TITLE, ATTR_ITEM_BY, ATTR_ITEM_URL } from "./constants";
import PacmanLoader from "react-spinners/PacmanLoader";
import linkIcon from "./icons8-external-link-64.png";

type Props = { itemID: number };

const Item = ({ itemID }: Props) => {
  const { isLoading, item } = useFetchStory(itemID);

  if (isLoading) {
    return (
      <div className="item-wrapper">
        <PacmanLoader color="rgb(252, 79, 8)" size="10px" />
      </div>
    );
  }

  return (
    <div className="item-wrapper">
      <div className="item-title">{item?.[ATTR_ITEM_TITLE]}</div>
      <div className="item-body">
        <div className="item-by">by {item?.[ATTR_ITEM_BY]}</div>
        {item?.[ATTR_ITEM_BY] && (
          <a
            href={item?.[ATTR_ITEM_URL]}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={linkIcon} className="item-link" alt="link-icon"></img>
          </a>
        )}
      </div>
    </div>
  );
};

export default Item;
