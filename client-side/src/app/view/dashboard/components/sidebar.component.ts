import { Component } from '@angular/core';
import { RegistrationService } from '../../registration/registration.service';

@Component({
  selector: 'sidebar',
  template: `
  <div class="sidebarContainer">

      <nav class="sidebar">
        <button mat-icon-button (click)="logout()">
          <mat-icon>logout</mat-icon>
        </button>
      </nav>
    </div>

  `,
  styles: [
    `
      .sidebarContainer {

        box-shadow:3px 1px 7px #5771742e, -5px 1px 19px -7px rgb(108 133 145);
        gap: 3rem;
        @apply flex flex-col h-full bg-white justify-between;
      }



      .sidebar {
        @apply flex flex-col items-center gap-8 p-4;

        & a{
          @apply w-[30px] h-[30px] flex justify-center items-center rounded-sm transition-all duration-300;
          &.active {
            @apply  transition-all duration-300;
            box-shadow: -5px 1px 19px -7px rgba(71, 26, 160, 0.3);
            filter: drop-shadow(3px 1px 7px rgba(117, 26, 160, 0.0));
            & mat-icon {
              filter: brightness(0) invert(1);
            }
          }
          &:hover {
            @apply transition-all duration-300;
            box-shadow: -5px 1px 19px -7px rgba(71, 26, 160, 0.1);
            filter: drop-shadow(3px 1px 7px rgba(117, 26, 160, 0.1));

          }
        }
      }

      .sidebarLogoIcon {
        @apply w-auto h-[60px];
      }

      .sidebarIcons {
        width: 32px;
        height: 31px;
      }
    `,]
})
export class SidebarComponent {
  constructor(private registerSrv: RegistrationService) {

  }
  logout() {
    this.registerSrv.logout();
  }
}
