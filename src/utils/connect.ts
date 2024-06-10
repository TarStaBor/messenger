import Block, { CommonProps } from '../core/Block';
import store, { MyStore, StoreEvents } from '../core/store';
import { isEqual } from './isEqual';

export function connect<P extends CommonProps>(mapStateToProps: (state: MyStore) => Partial<P>) {
    return function (Component: typeof Block<P>): typeof Block<P> {
        return class extends Component {
            private onChangeStoreCallback: () => void;

            constructor(props: P) {
                let state = mapStateToProps(store.getState());

                super({ ...props, ...state });

                this.onChangeStoreCallback = () => {
                    const newState = mapStateToProps(store.getState());

                    if (!isEqual(state, newState)) {
                        this.setProps({ ...newState });
                    }

                    state = newState;
                };

                store.on(StoreEvents.Updated, this.onChangeStoreCallback);
            }
        };
    };
}
