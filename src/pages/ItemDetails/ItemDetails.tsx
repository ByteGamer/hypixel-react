import React, { useEffect, useState } from 'react';
import Search from '../../components/Search/Search';
import PriceGraph from '../../components/PriceGraph/PriceGraph';
import './ItemDetails.css';
import { useParams } from "react-router-dom";
import { parseItem } from '../../utils/Parser/APIResponseParser';
import { convertTagToName } from '../../utils/Formatter';
import api from '../../api/ApiHelper';

function ItemDetails() {

    let { tag } = useParams();
    let [item, setItem] = useState<Item>();

    useEffect(() => {     
        api.getItemDetails(tag).then(detailedItem=>{
            api.getItemImageUrl({ tag: tag }).then(iconUrl => {
                detailedItem.name = convertTagToName(tag);
                detailedItem.iconUrl = iconUrl;
                setItem(detailedItem);
            })
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tag]);

    let getItem = (): Item => {
        return item || parseItem({
            tag: tag,
            name: convertTagToName(tag)
        })
    }

    return (
        <div className="item-details">
            <Search selected={getItem()} />
            <PriceGraph item={getItem()} />
        </div >
    );
}

export default ItemDetails;
