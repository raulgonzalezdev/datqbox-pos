/*!

   

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import { Box, useStyleConfig } from "@chakra-ui/react";
function PanelContainer(props) {
  const { variant, children, ...rest } = props;
  const styles = useStyleConfig("PanelContainer", { variant });
  // Pass the computed styles into the `__css` prop
  return (
    <Box __css={styles} {...rest}>
      {children}
    </Box>
  );
}

export default PanelContainer;
