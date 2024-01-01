import React, { useState } from 'react';

type day = { id: string; day: number; lab: string };
function Lab() {
  const [items, setItems] = useState<day[]>([
    { id: '1', day: 1, lab: 'Lab1' },
    { id: '2', day: 2, lab: 'Lab2' },
    { id: '3', day: 3, lab: 'Lab3' },
    { id: '4', day: 5, lab: 'Lab4' },
  ]);
  const [sockets] = useState<string[]>(['socket1', 'socket1', 'socket1', 'socket1', 'socket5', 'socket6']);
  function handleOnDrag(e: React.DragEvent, id: string) {
    e.dataTransfer.setData('id', id);
  }

  function handleOnDrop(e: React.DragEvent, indexAssignedDay: number) {
    const day = indexAssignedDay + 1;

    if (items.findIndex((item) => item.day === day) == -1) {
      const id = e.dataTransfer.getData('id') as unknown as string;
      const arrIndex = items.findIndex((item) => item.id === id);
      const newArr = [...items];
      newArr[arrIndex] = { ...newArr[arrIndex], day };
      setItems(newArr);
    }
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
  }
  return (
    <>
      <div style={{ display: 'flex', width: '100%' }}>
        {sockets.map((item, index) => {
          const indexFound = items.findIndex((item) => item.day === index + 1);
          if (indexFound >= 0) {
            return (
              <div
                key={index}
                style={{ width: '18%', border: '1px solid blue', height: '200px' }}
                draggable
                onDragStart={(e) => handleOnDrag(e, items[indexFound].id)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleOnDrop(e, index)}
              >
                {items[indexFound] && items[indexFound].lab}
              </div>
            );
          } else {
            return (
              <div
                key={index}
                style={{ width: '18%', border: '1px solid blue', height: '200px' }}
                onDragOver={handleDragOver}
                onDrop={(e) => handleOnDrop(e, index)}
              ></div>
            );
          }
        })}
      </div>
    </>
  );
}

export default Lab;
