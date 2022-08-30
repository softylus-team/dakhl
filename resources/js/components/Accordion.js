import React from 'react';
import { Accordion, AccordionItem } from 'react-light-accordion';
import 'react-light-accordion/demo/css/index.css';

const customAccordion = function ({ title,children }) {

  return (
    <div>
      <Accordion atomic={true}>

        <AccordionItem title={title}>

          {children}

        </AccordionItem>

      </Accordion>
    </div>
  );
}

export default customAccordion;