import React, { useEffect, useState } from 'react'
import { Card, Badge } from 'react-bootstrap'
import moment from 'moment'
import { numberWithThousandsSeperators } from '../../../utils/Formatter'
import api from '../../../api/ApiHelper'
import { getLoadingElement } from '../../../utils/LoadingUtils'
import { useForceUpdate } from '../../../utils/Hooks'
import Link from 'next/link'
import styles from './FlipBased.module.css'

interface Props {
    flip: FlipAuction
}

function FlipBased(props: Props) {
    let [auctions, setAuctions] = useState<Auction[]>([])
    let [isLoading, setIsLoading] = useState(true)

    let forceUpdate = useForceUpdate()

    useEffect(() => {
        api.getFlipBasedAuctions(props.flip.uuid).then(auctions => {
            setAuctions(auctions.sort((a, b) => b.end.getTime() - a.end.getTime()))
            setIsLoading(false)
        })
    }, [props.flip.uuid])

    useEffect(() => {
        forceUpdate()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.flip.item.iconUrl, props.flip.item.name])

    let auctionsElement = auctions.map(auction => {
        return (
            <div className={styles.cardWrapper} style={{ display: 'inline-block' }} key={auction.uuid}>
                <span className="disableLinkStyle">
                    <Link href={`/auction/${auction.uuid}`}>
                        <a className="disableLinkStyle">
                            <Card className="card">
                                <Card.Header style={{ padding: '10px' }}>
                                    <p className="ellipsis" style={{ width: '180px' }}>
                                        <img
                                            crossOrigin="anonymous"
                                            src={props.flip.item.iconUrl}
                                            height="32"
                                            alt=""
                                            style={{ marginRight: '5px' }}
                                            loading="lazy"
                                        />
                                        {auction.item.name}
                                    </p>
                                </Card.Header>
                                <Card.Body>
                                    <div>
                                        <ul>
                                            <li>Ended {moment(auction.end).fromNow()}</li>
                                            <li>{numberWithThousandsSeperators(auction.highestBid || auction.startingBid)} Coins</li>
                                            {auction.bin ? (
                                                <li>
                                                    <Badge style={{ marginLeft: '5px' }} variant="success">
                                                        BIN
                                                    </Badge>
                                                </li>
                                            ) : (
                                                ''
                                            )}
                                        </ul>
                                    </div>
                                </Card.Body>
                            </Card>
                        </a>
                    </Link>
                </span>
            </div>
        )
    })

    return (
        <div>
            {isLoading ? (
                getLoadingElement()
            ) : (
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'stretch' }}>{auctionsElement}</div>
            )}
        </div>
    )
}

export default FlipBased
