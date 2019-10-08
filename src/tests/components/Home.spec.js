import Home from '../../components/Home';
import { shallow } from 'enzyme';

describe('Home', () => {
    let home;


    beforeEach(() => {
        home = shallow(<Home />);
    });

    it('should display header bar', () => {
        const header = home.find('.home-header');
        expect(header).toHaveLength(1)
    });
});