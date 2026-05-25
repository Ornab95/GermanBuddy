import { Routes } from '@angular/router';
import { Dashboard } from './component/dashboard/dashboard';
import { GermanAlphabet } from './component/language/german-alphabet/german-alphabet';
import { GermanNumbers } from './component/language/german-numbers/german-numbers';
import { GermanVocabulary } from './component/language/german-vocabulary/german-vocabulary';
import { GermanConversation } from './component/language/german-conversation/german-conversation';

export const routes: Routes = [
  { path: '', component: Dashboard },
  { path: 'alphabet', component: GermanAlphabet },
  { path: 'numbers', component: GermanNumbers },
  { path: 'vocabulary', component: GermanVocabulary },
  { path: 'vocabulary/:category', component: GermanVocabulary },
  { path: 'conversation', component: GermanConversation },
  { path: '**', redirectTo: '' }
];


