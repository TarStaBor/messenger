import Block from '../../core/Block';
import { Modal } from '../modal';
import { Button } from '../button';
import { Tooltip } from '../tooltip';
import { ChatSettings } from './chatSettings';
import { ChatSettingsForm } from './chatSettingsForm';
import { ISettingsMenu } from './types';

export class SettingsMenu extends Block<ISettingsMenu> {
    init() {
        const handleSettingButtonClickBind = this.handleSettingButtonClick.bind(this);
        const handleTooltipHideBind = this.handleTooltipHide.bind(this);

        const Trigger = new Button({
            type: 'button',
            variant: 'primary',
            fill: 'ghost',
            icon: 'dots',
            asIconButton: true,
        });

        const SettingsModal = new Modal({
            Content: new ChatSettingsForm({ type: 'addUser' }),
            onClose: this.handleModalClose.bind(this),
        });

        const SettingsTooltip = new Tooltip({
            onHide: handleTooltipHideBind,
            Content: new ChatSettings({
                settingType: this.props.settingType,
                events: {
                    click: handleSettingButtonClickBind,
                },
            }),
        });

        this.children = {
            ...this.children,
            Trigger,
            SettingsTooltip,
            SettingsModal,
        };
    }

    handleSettingButtonClick(e: Event) {
        const target = e.target as HTMLElement;
        const id = target.id;
        if (!id) return;
        if (id === 'changeGroup') {
            this.children.SettingsTooltip.children.Content.setProps({ settingType: 'changeGroup' });
        } else {
            this.children.SettingsModal.setProps({
                open: true,
            });
            this.children.SettingsModal.children.Content.setProps({ type: id });
            (this.children.SettingsTooltip as Tooltip).onHide();
        }
    }

    handleTooltipHide() {
        this.children.SettingsTooltip.children.Content.setProps({
            settingType: this.props.settingType,
        });
    }

    handleModalClose() {
        this.children.SettingsModal.setProps({ open: false });
        (this.children.SettingsModal.children.Content as ChatSettingsForm).reset();
    }

    protected componentDidMount(): void {
        const button = this.children.Trigger.getContent();
        if (!button) return;
        this.children.SettingsTooltip.setProps({ trigger: button });
    }

    protected componentWillUnmount(): void {
        this.children.SettingsModal.setProps({ isModalOpen: false });
    }

    render() {
        return `
            <div class="settingsMenu">
                {{{ Trigger }}}
                {{{ SettingsTooltip }}}
                {{{ SettingsModal }}}
            </div>
        `;
    }
}
