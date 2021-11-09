import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

// This SVG file import will be handled by webpack's raw-text loader.
// This means that imageIcon will hold the source SVG.
import SaveIcon from './save_icon.svg';
import LoadingIcon from './loading_icon.svg';

import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';

export default class SaveButton extends Plugin {
    static get pluginName() {
        return 'SaveButton';
    }

    init() {
        console.log( 'SaveButton was initialized' );

        const editor = this.editor;
        const pluginConfig = editor.config.get('saveButton');

        this.saveButton = editor.ui.componentFactory.add( 'saveButton', locale => {
            const view = new ButtonView( locale );


            const viewSetSaving = () => {
                view.set( {
                    label: 'Сохранение...',
                    icon: LoadingIcon,
                    tooltip: false,
                    withText: true,
                    isEnabled: false
                } );
            }

            const viewSetDefault = () => {
                view.set( {
                    label: 'Сохранить',
                    icon: SaveIcon,
                    tooltip: false,
                    withText: true,
                    isEnabled: true
                } );
            }

            viewSetDefault();
            // Callback executed once the button is clicked.
            view.on('execute', () => { viewSetSaving(); pluginConfig.onSaveClicked(this.editor.data.get()).then(viewSetDefault).catch(viewSetDefault); });
            return view;
        } );
    }
}
