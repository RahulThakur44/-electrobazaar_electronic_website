import React from 'react';
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Container,
  Divider,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Help = () => {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        ❓ Help & Support
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Find answers to common questions below. If you still need help, feel free to contact us!
      </Typography>

      <Box mt={4}>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>How do I place an order?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Browse products, click “Add to Cart,” and then go to the cart page to proceed to checkout.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Can I cancel my order?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Yes, you can cancel your order before it is shipped. Contact support with your order ID.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>How can I track my delivery?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              After your order is shipped, you will receive a tracking link on your registered email or mobile number.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Do you offer returns or refunds?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Yes, we offer easy returns within 7 days of delivery for damaged or wrong products.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>

      <Divider sx={{ my: 4 }} />

      <Box>
        <Typography variant="h6">📞 Still need help?</Typography>
        <Typography>Email us: <strong>support@electrobazaar.com</strong></Typography>
        <Typography>Call us: <strong>+91-99691xxxxx</strong></Typography>
        <Typography>Support Hours: Mon - Sat, 10 AM - 6 PM</Typography>
      </Box>
    </Container>
  );
};

export default Help;
