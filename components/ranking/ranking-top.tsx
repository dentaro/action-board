// TOPページ用のランキングコンポーネント
import { getRanking } from "@/lib/services/ranking";
import BaseRanking from "./base-ranking";
import type { RankingPeriod } from "./period-toggle";
import { RankingItem } from "./ranking-item";

interface RankingTopProps {
  title?: string;
  limit?: number;
  showDetailedInfo?: boolean; // 詳細情報を表示するかどうか
  period?: RankingPeriod;
}

export default async function RankingTop({
  title,
  limit = 10,
  showDetailedInfo = false,
  period = "all",
}: RankingTopProps) {
  const rankings = await getRanking(limit, period);

  const periodLabel = period === "daily" ? "日次" : "";

  return (
    <BaseRanking
      title={title ?? `🏅${periodLabel}アクションリーダートップ${limit}`}
      detailsHref="/ranking"
      showDetailedInfo={showDetailedInfo}
    >
      {rankings.map((user) => (
        <RankingItem key={user.user_id} user={user} />
      ))}
    </BaseRanking>
  );
}
