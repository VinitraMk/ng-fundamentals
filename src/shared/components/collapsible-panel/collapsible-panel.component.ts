import { Component, Input } from "@angular/core";

@Component({
    selector: 'collapsible-panel',
    templateUrl: 'collapsible-panel.component.html'
})

export class CollapsiblePanelComponent {
    visible: boolean = false;

    toggleContent() {
        this.visible = !this.visible;
    }
}