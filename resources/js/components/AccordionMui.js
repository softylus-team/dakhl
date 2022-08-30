import * as React from 'react';
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';

export default function SimpleAccordion({title, children,containerClass}) {
  const ExpandMoreIcon = () => <svg fill="#ccc" width="16px" height="16px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM256 368C269.3 368 280 357.3 280 344V280H344C357.3 280 368 269.3 368 256C368 242.7 357.3 232 344 232H280V168C280 154.7 269.3 144 256 144C242.7 144 232 154.7 232 168V232H168C154.7 232 144 242.7 144 256C144 269.3 154.7 280 168 280H232V344C232 357.3 242.7 368 256 368z" /></svg>;
  const Minimize = () => <svg fill="#ccc" width="16px" height="16px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM168 232C154.7 232 144 242.7 144 256C144 269.3 154.7 280 168 280H344C357.3 280 368 269.3 368 256C368 242.7 357.3 232 344 232H168z" /></svg>;
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <div className={containerClass}>
      <Accordion square={true}
        expanded={expanded === 'panel1'} onChange={handleChange('panel1')}
      >
        <AccordionSummary
          expandIcon={<svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13 7L7 1L1 7" stroke="#02044F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>}
          aria-controls="panel1a-content"
          id="panel1a-header"
          // classes="title"
        >
          {title}
        </AccordionSummary>
        <AccordionDetails>
          {children}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}