import { Button, TextField } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import * as Styled from './PaymentPage.styles';

const PaymentPage = () => {
    const { orderId } = useParams<{ orderId: string }>();
    const [address, setAddress] = useState('');
    const navigate = useNavigate();
    const { mutateAsync: mutatePay } = useMutation(
        'payOrder',
        () =>
            axios.post(`/api/payments`, {
                orderId: orderId,
            }),
        { onSuccess: () => navigate(`/status/${orderId}`) }
    );
    const { mutateAsync: mutateFinalize } = useMutation(
        'finalizeOrder',
        () =>
            axios.put(`/api/orders/${orderId}/finalize`, {
                userId: uuidv4(),
                deliveryDetails: {
                    address: address,
                },
            }),
        { onSuccess: () => mutatePay() }
    );

    return (
        <Styled.InputWrapper>
            <h3>Finalize payment</h3>
            <TextField
                label="Address"
                sx={{ m: 1, width: '30ch' }}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
            />
            <TextField
                label="Credit card number"
                sx={{ m: 1, width: '30ch' }}
            />
            <TextField
                label="Expiration Date (MM/YYYY)"
                sx={{ m: 1, width: '30ch' }}
            />
            <TextField label="CVV" sx={{ m: 1, width: '30ch' }} />
            <Button variant="contained" onClick={() => mutateFinalize()}>
                Pay now
            </Button>
        </Styled.InputWrapper>
    );
};

export default PaymentPage;
