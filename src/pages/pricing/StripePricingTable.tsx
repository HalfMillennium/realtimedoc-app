import { useMantineColorScheme } from '@mantine/core';

// If using TypeScript, add the following snippet to your file as well.
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'stripe-pricing-table': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}

export const StripePricingTable: React.FC<{userId: string, userEmail: string}> = ({userId, userEmail}) => {
  const { colorScheme } = useMantineColorScheme();
  if (colorScheme === 'dark') {
    return (
      <stripe-pricing-table
       pricing-table-id="prctbl_1QfpY1GIOCXPZaJUCV9DoA2V"
       publishable-key="pk_test_51QMHMqGIOCXPZaJUv0yl1ontnNPbdie2PISoQxQI03u2C8THXP4dYrMRVnM149a7pJsigtKsQv21hAW2ofllbWn100jrB5v76J"
       client-reference-id={userId}
        customer-email={userEmail}
     ></stripe-pricing-table>
    );
  }
  return (
    <stripe-pricing-table
      pricing-table-id="prctbl_1QfpRFGIOCXPZaJUdB0nQrnC"
      publishable-key="pk_test_51QMHMqGIOCXPZaJUv0yl1ontnNPbdie2PISoQxQI03u2C8THXP4dYrMRVnM149a7pJsigtKsQv21hAW2ofllbWn100jrB5v76J"
      customer-email={userEmail}
    ></stripe-pricing-table>
  );
};
