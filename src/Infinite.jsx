import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Reels } from './Reels';
const Infinite = () => {
  const allItems = Array.from({ length: 1000 }, (_, index) => `Item ${index + 1}`);
  const [items, setItems] = useState(allItems.slice(0, 20)); // Load first 20 items
  const [hasMore, setHasMore] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(20); // Start loading from index 20

  const fetchMoreData = () => {
    console.log("Loading more items...");

    const nextItems = allItems.slice(currentIndex, currentIndex + 20);
    
    if (nextItems.length === 0) {
      setHasMore(false);
      return;
    }

    setItems(prevItems => [...prevItems, ...nextItems]);
    setCurrentIndex(prevIndex => prevIndex + 20);
  };

  return (
    <InfiniteScroll
      dataLength={items.length}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
      endMessage={<p>No more items</p>}
    >
      <div style={{ padding: '20px', textAlign: 'center' }}>
        {items.map((_, index) => (
          <Reels key={index} index={index + items.length} />  
        ))}
      </div>
    </InfiniteScroll>
  );
};

export default Infinite;
