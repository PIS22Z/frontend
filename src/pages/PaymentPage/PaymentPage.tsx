import { Button, TextField } from '@mui/material';
import axios from 'axios';
import { useMutation } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';

import * as Styled from './PaymentPage.styles';

const PaymentPage = () => {
    const { orderId } = useParams<{ orderId: string }>();
    const navigate = useNavigate();
    const { mutateAsync: mutatePay } = useMutation(
        'payOrder',
        () =>
            axios.post(`/api/payments`, {
                orderId: orderId,
            }),
        { onSuccess: () => navigate(`/status/${orderId}`) }
    );

    return (
        <Styled.InputWrapper>
            <h3>Finalize payment</h3>
            <TextField
                label="Credit card number"
                sx={{ m: 1, width: '30ch' }}
            />
            <TextField
                label="Expiration Date (MM/YYYY)"
                sx={{ m: 1, width: '30ch' }}
            />
            <TextField label="CVV" sx={{ m: 1, width: '30ch' }} />
            <Button variant="contained" onClick={() => mutatePay()}>
                Pay now
            </Button>
        </Styled.InputWrapper>
    );
};

export default PaymentPage;
