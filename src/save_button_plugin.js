import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

// This SVG file import will be handled by webpack's raw-text loader.
// This means that imageIcon will hold the source SVG.
import SaveIcon from './save_icon.svg';
import LoadingIcon from './loading_icon.svg';

import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';

export default class SaveButton extends Plugin {
    init() {
        console.log( 'SaveButton was initialized' );

        const editor = this.editor;
        const saveClickedCallback = editor.config.saveButton && editor.config.saveButton.onSaveClicked 
                                    ? 
                                    editor.config.saveButton.onSaveClicked 
                                    :
                                    (() => new Promise((resolve) => { setTimeout(() => {resolve();}, 1000) }))

        this.saveButton = editor.ui.componentFactory.add( 'saveButton', locale => {
            const view = new ButtonView( locale );

            const viewSetSaving = () => {
                view.set( {
                    label: ' Сохранение...',
                    icon: LoadingIcon,
                    tooltip: false,
                    withText: true,
                } );
    
                // Callback executed once the image is clicked.
                view.on('execute', () => {} );
            }

            const viewSetDefault = () => {
                view.set( {
                    label: ' Сохранить',
                    icon: SaveIcon,
                    tooltip: false,
                    withText: true,
                } );
    
                // Callback executed once the image is clicked.
                view.on('execute', () => { viewSetSaving(); saveClickedCallback().then(() => viewSetDefault()); });
            }

            viewSetDefault();

            return view;
        } );
    }
}
