// Angular
import { Component, OnInit, Input } from '@angular/core';
// RxJS
import { Observable } from 'rxjs';
// NGRX
import { select, Store } from '@ngrx/store';
// State
import { AppState } from '../../../../core/reducers';
import { currentUser, Logout, User } from '../../../../core/auth';
import { AuthenticationService } from '../../../../services/authentication.service';
import { CurrentuserService } from '../../../../services/currentuser.service';

@Component({
	selector: 'kt-user-profile',
	templateUrl: './user-profile.component.html',
})
export class UserProfileComponent implements OnInit {
	// Public properties
	user: any;

	@Input() showAvatar: boolean = false;
	@Input() showHi: boolean = true;
	@Input() showBadge: boolean = false;

	/**
	 * Component constructor
	 *
	 */
	constructor(private authService: AuthenticationService, private currentUserService: CurrentuserService) {}

	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	/**
	 * On init
	 */
	ngOnInit(): void {
		this.currentUserService.currentUser$.subscribe(res => {
			this.user = res;
		});
	}

	/**
	 * Log out
	 */
	logout() {
		this.authService.logout();
	}
}
