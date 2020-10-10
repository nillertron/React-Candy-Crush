
import * as React from 'react';

class Rules  extends React.Component {
    render() { 
        return (
        <React.Fragment>
        <p>Rules:</p>
            <p>
              1. Click a bubble and click either adjecant bubble or one
              above/below.
            </p>
            <p>2. A move with no pops = -50 point</p>
            <p>3. A move with 3 pops = 10 point</p>
            <p>4. A move with 4 pops = 20 point</p>
            <p>5. A move with 5 pops = 50 point</p>
            <p>6. A move with 6 or above pops = 100 point</p>
        </React.Fragment>
        );
    }
}
 
export default Rules;