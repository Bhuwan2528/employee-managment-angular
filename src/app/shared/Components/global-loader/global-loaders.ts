import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { selectGlobalLoading } from '../../../store/selectors/global-loading.selector';

@Component({
  selector: 'app-global-loaders',
  imports: [],
  templateUrl: './global-loaders.html',
  styleUrl: './global-loaders.scss',
})
export class GlobalLoaders {

  store = inject(Store)

  loading = toSignal(this.store.select(selectGlobalLoading), {initialValue: false})
}
