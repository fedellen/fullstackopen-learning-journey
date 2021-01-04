import React from 'react';
import { Part } from '../types';

interface ContentProps {
  parts: Part[];
}

const Content: React.FC<ContentProps> = (props) => {
  return (
    <div>
      <p>
        {props.parts[0].name} {props.parts[0].exerciseCount}
      </p>
      <p>
        {props.parts[1].name} {props.parts[1].exerciseCount}
      </p>
      <p>
        {props.parts[2].name} {props.parts[2].exerciseCount}
      </p>
    </div>
  );
};

export default Content;
