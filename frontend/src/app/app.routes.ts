import { Routes } from '@angular/router';
import { Dashboard } from './component/dashboard/dashboard';
import { GermanAlphabet } from './component/language/german-alphabet/german-alphabet';
import { GermanNumbers } from './component/language/german-numbers/german-numbers';
import { GermanVocabulary } from './component/language/german-vocabulary/german-vocabulary';
import { GermanConversation } from './component/language/german-conversation/german-conversation';
import { GermanGrammar } from './component/language/german-grammar/german-grammar';
import { WordGame } from './component/game/word-game/word-game';
import { LandingPreview } from './component/landing-preview/landing-preview';

export const routes: Routes = [
  { path: '', component: Dashboard },
  { path: 'landing', component: LandingPreview },
  { path: 'landing-preview', component: LandingPreview },
  { path: 'alphabet', component: GermanAlphabet },
  { path: 'alphabet/:tab', component: GermanAlphabet },
  { path: 'numbers', component: GermanNumbers },
  { path: 'vocabulary', component: GermanVocabulary },
  { path: 'vocabulary/:category', component: GermanVocabulary },
  { path: 'conversation', component: GermanConversation },
  { path: 'grammar', component: GermanGrammar },
  { path: 'game', component: WordGame },
  { path: '**', redirectTo: '' }
];
